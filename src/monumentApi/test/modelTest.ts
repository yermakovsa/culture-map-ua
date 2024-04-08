import {
    ArticleDTO,
    ArticleListDTO,
    Base64FileDTO,
    CoordinatesDTO,
    EmailDTO,
    HelpTypeDTO,
    MonumentDTO,
    MonumentLevelDTO,
    MonumentListDTO,
    MonumentOwnershipDTO,
    MonumentStatusDTO,
    MonumentTypeDTO,
    PersonHelpDTO,
    PhotoDTO,
    ReportedMonumentDTO,
} from "../model";

export class Random {
    seed: number;
    constructor(seed: number) {
        this.seed = seed % 2147483647;
        if (this.seed <= 0) this.seed += 2147483646;
    }

    next(): number {
        this.seed = (this.seed * 16807) % 2147483647;
        return this.seed;
    }

    nextFloat(): number {
        return (this.next() - 1) / 2147483646;
    }

    nextInt(limit: number): number {
        return this.next() % limit;
    }

    nextnumber(limit: number): number {
        return this.next() % limit;
    }

    nextBoolean(): boolean {
        return this.nextInt(2) == 0;
    }

    pickOne<T>(options: Array<T>): T {
        return options[this.nextInt(options.length)];
    }

    pickSome<T>(options: Array<T>, n?: number): T[] {
        const shuffled = options.sort(() => 0.5 - this.next());
        return shuffled.slice(0, n || this.nextInt(options.length));
    }

    uuidv4(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = this.nextInt(16) | 0;
            const v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}

type Factory<T> = {
    [P in keyof T]?: ((sampleData: TestSampleData) => T[P]) | T[P];
};

type ModelFactory<T> = Factory<T> | ((testData: TestSampleData) => T);

export interface SampleModelFactories {
    ArticleDTO?: ModelFactory<ArticleDTO>;
    ArticleListDTO?: ModelFactory<ArticleListDTO>;
    Base64FileDTO?: ModelFactory<Base64FileDTO>;
    CoordinatesDTO?: ModelFactory<CoordinatesDTO>;
    EmailDTO?: ModelFactory<EmailDTO>;
    HelpTypeDTO?: ModelFactory<HelpTypeDTO>;
    MonumentDTO?: ModelFactory<MonumentDTO>;
    MonumentLevelDTO?: ModelFactory<MonumentLevelDTO>;
    MonumentListDTO?: ModelFactory<MonumentListDTO>;
    MonumentOwnershipDTO?: ModelFactory<MonumentOwnershipDTO>;
    MonumentStatusDTO?: ModelFactory<MonumentStatusDTO>;
    MonumentTypeDTO?: ModelFactory<MonumentTypeDTO>;
    PersonHelpDTO?: ModelFactory<PersonHelpDTO>;
    PhotoDTO?: ModelFactory<PhotoDTO>;
    ReportedMonumentDTO?: ModelFactory<ReportedMonumentDTO>;
}

export interface SamplePropertyValues {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (sampleData: TestSampleData) => any;
}

export interface TestData {
    seed?: number;
    sampleModelProperties?: SampleModelFactories;
    samplePropertyValues?: SamplePropertyValues;
    now?: Date;
}

export interface PropertyDefinition {
    containerClass: string;
    propertyName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    example?: string | null | Array<any>;
    isNullable?: boolean;
}

export class TestSampleData {
    random: Random;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sampleModelProperties: any;
    samplePropertyValues: SamplePropertyValues;
    now: Date;

    constructor({ seed, sampleModelProperties, samplePropertyValues, now }: TestData) {
        this.random = new Random(seed || 100);
        this.now = now || new Date(2019, 1, seed);
        this.sampleModelProperties = sampleModelProperties || {};
        this.samplePropertyValues = samplePropertyValues || {};
    }

    nextFloat(): number {
        return this.random.nextFloat();
    }

    nextInt(limit: number): number {
        return this.random.nextInt(limit);
    }

    nextBoolean(): boolean {
        return this.random.nextBoolean();
    }

    sampleboolean(): boolean {
        return this.random.nextBoolean();
    }

    pickOne<T>(options: Array<T>): T {
        return this.random.pickOne(options);
    }

    pickSome<T>(options: Array<T>): T[] {
        return this.random.pickSome(options);
    }

    uuidv4(): string {
        return this.random.uuidv4();
    }

    randomArray<T>(generator: (n: number) => T, length?: number): T[] {
        if (!length) length = this.nextInt(3) + 1;
        return Array.from({ length }).map((_, index) => generator(index));
    }

    randomEmail(): string {
        return (
            this.randomFirstName().toLowerCase() +
            "." +
            this.randomLastName().toLowerCase() +
            "@" +
            this.randomDomain()
        );
    }

    randomFirstName(): string {
        return this.pickOne(["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Linda"]);
    }

    randomLastName(): string {
        return this.pickOne(["Smith", "Williams", "Johnson", "Jones", "Brown", "Davis", "Wilson"]);
    }

    randomFullName(): string {
        return this.randomFirstName() + " " + this.randomLastName();
    }

    randomDomain(): string {
        return (
            this.pickOne(["a", "b", "c", "d", "e"]) +
            ".example." +
            this.pickOne(["net", "com", "org"])
        );
    }

    randomPastDateTime(now: Date): Date {
        return new Date(now.getTime() - this.nextInt(4 * 7 * 24 * 60 * 60 * 1000));
    }

    sampleDateTime(): Date {
        return this.randomPastDateTime(this.now);
    }

    samplenumber(): number {
        return this.nextInt(10000);
    }

    sampleDate(): Date {
        return this.randomPastDateTime(this.now);
    }

    sampleString(dataFormat?: string, example?: string): string {
        if (dataFormat === "uuid") {
            return this.uuidv4();
        }
        if (dataFormat === "uri") {
            return "https://" + this.randomDomain() + "/" + this.randomFirstName().toLowerCase();
        }
        if (dataFormat === "email") {
            return this.randomEmail();
        }
        if (example && example !== "null") return example;
        return "foo";
    }

    sampleArrayString(length?: number): Array<string> {
        return Array.from({ length: length || this.arrayLength() }).map(() => this.sampleString());
    }

    generate(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        template?: ((sampleData: TestSampleData) => any) | any,
        propertyDefinition?: PropertyDefinition,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generator?: () => any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any {
        if (template) {
            return typeof template === "function" ? template(this) : template;
        }
        if (propertyDefinition) {
            const { containerClass, propertyName, example } = propertyDefinition;
            if (this.sampleModelProperties[containerClass]) {
                const propertyFactory = this.sampleModelProperties[containerClass][propertyName];
                if (propertyFactory && typeof propertyFactory === "function") {
                    return propertyFactory(this);
                } else if (propertyFactory) {
                    return propertyFactory;
                }
            }
            if (this.samplePropertyValues[propertyName]) {
                return this.samplePropertyValues[propertyName](this);
            }
            if (example && example !== "null") return example;
        }
        return generator && generator();
    }

    arrayLength(): number {
        return this.nextInt(3) + 1;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sample(modelName: string): any {
        switch (modelName) {
            case "ArticleDTO":
                return this.sampleArticleDTO();
            case "Array<ArticleDTO>":
                return this.sampleArrayArticleDTO();
            case "ArticleListDTO":
                return this.sampleArticleListDTO();
            case "Array<ArticleListDTO>":
                return this.sampleArrayArticleListDTO();
            case "Base64FileDTO":
                return this.sampleBase64FileDTO();
            case "Array<Base64FileDTO>":
                return this.sampleArrayBase64FileDTO();
            case "CoordinatesDTO":
                return this.sampleCoordinatesDTO();
            case "Array<CoordinatesDTO>":
                return this.sampleArrayCoordinatesDTO();
            case "EmailDTO":
                return this.sampleEmailDTO();
            case "Array<EmailDTO>":
                return this.sampleArrayEmailDTO();
            case "HelpTypeDTO":
                return this.sampleHelpTypeDTO();
            case "Array<HelpTypeDTO>":
                return this.sampleArrayHelpTypeDTO();
            case "MonumentDTO":
                return this.sampleMonumentDTO();
            case "Array<MonumentDTO>":
                return this.sampleArrayMonumentDTO();
            case "MonumentLevelDTO":
                return this.sampleMonumentLevelDTO();
            case "Array<MonumentLevelDTO>":
                return this.sampleArrayMonumentLevelDTO();
            case "MonumentListDTO":
                return this.sampleMonumentListDTO();
            case "Array<MonumentListDTO>":
                return this.sampleArrayMonumentListDTO();
            case "MonumentOwnershipDTO":
                return this.sampleMonumentOwnershipDTO();
            case "Array<MonumentOwnershipDTO>":
                return this.sampleArrayMonumentOwnershipDTO();
            case "MonumentStatusDTO":
                return this.sampleMonumentStatusDTO();
            case "Array<MonumentStatusDTO>":
                return this.sampleArrayMonumentStatusDTO();
            case "MonumentTypeDTO":
                return this.sampleMonumentTypeDTO();
            case "Array<MonumentTypeDTO>":
                return this.sampleArrayMonumentTypeDTO();
            case "PersonHelpDTO":
                return this.samplePersonHelpDTO();
            case "Array<PersonHelpDTO>":
                return this.sampleArrayPersonHelpDTO();
            case "PhotoDTO":
                return this.samplePhotoDTO();
            case "Array<PhotoDTO>":
                return this.sampleArrayPhotoDTO();
            case "ReportedMonumentDTO":
                return this.sampleReportedMonumentDTO();
            case "Array<ReportedMonumentDTO>":
                return this.sampleArrayReportedMonumentDTO();
            default:
                throw new Error("Unknown type " + modelName);
        }
    }

    sampleArticleDTO(template: Factory<ArticleDTO> = {}): ArticleDTO {
        const containerClass = "ArticleDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            id: this.generate(
                template?.id,
                { containerClass, propertyName: "id", isNullable: false },
                () => this.sampleString("", "null")
            ),
            url: this.generate(
                template?.url,
                { containerClass, propertyName: "url", isNullable: false },
                () => this.sampleString("", "null")
            ),
            name: this.generate(
                template?.name,
                { containerClass, propertyName: "name", isNullable: false },
                () => this.sampleString("", "null")
            ),
            author: this.generate(
                template?.author,
                { containerClass, propertyName: "author", isNullable: false },
                () => this.sampleString("", "null")
            ),
            language: this.generate(
                template?.language,
                { containerClass, propertyName: "language", isNullable: false },
                () => this.sampleString("", "null")
            ),
            numberOfViews: this.generate(
                template?.numberOfViews,
                { containerClass, propertyName: "numberOfViews", example: "null", isNullable: false },
                () => this.samplenumber()
            ),
            previewImageUrl: this.generate(
                template?.previewImageUrl,
                { containerClass, propertyName: "previewImageUrl", isNullable: false },
                () => this.sampleString("", "null")
            ),
            creationDate: this.generate(
                template?.creationDate,
                { containerClass, propertyName: "creationDate", example: "null", isNullable: false },
                () => this.sampleDate()
            ),
            article: this.generate(
                template?.article,
                { containerClass, propertyName: "article", isNullable: false },
                () => this.sampleString("", "null")
            ),
        };
    }

    sampleArrayArticleDTO(
        template: Factory<ArticleDTO> = {},
        length?: number
    ): Array<ArticleDTO> {
        return this.randomArray(
            () => this.sampleArticleDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleArticleListDTO(template: Factory<ArticleListDTO> = {}): ArticleListDTO {
        const containerClass = "ArticleListDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            pageSize: this.generate(
                template?.pageSize,
                { containerClass, propertyName: "pageSize", example: "null", isNullable: false },
                () => this.samplenumber()
            ),
            pageNumber: this.generate(
                template?.pageNumber,
                { containerClass, propertyName: "pageNumber", example: "null", isNullable: false },
                () => this.samplenumber()
            ),
            numberOfArticles: this.generate(
                template?.numberOfArticles,
                { containerClass, propertyName: "numberOfArticles", example: "null", isNullable: false },
                () => this.samplenumber()
            ),
            articles: this.generate(
                template?.articles,
                { containerClass, propertyName: "articles", example: null, isNullable: false },
                () => this.sampleArrayArticleDTO()
            ),
        };
    }

    sampleArrayArticleListDTO(
        template: Factory<ArticleListDTO> = {},
        length?: number
    ): Array<ArticleListDTO> {
        return this.randomArray(
            () => this.sampleArticleListDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleBase64FileDTO(template: Factory<Base64FileDTO> = {}): Base64FileDTO {
        const containerClass = "Base64FileDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            base64: this.generate(
                template?.base64,
                { containerClass, propertyName: "base64", isNullable: false },
                () => this.sampleString("", "null")
            ),
        };
    }

    sampleArrayBase64FileDTO(
        template: Factory<Base64FileDTO> = {},
        length?: number
    ): Array<Base64FileDTO> {
        return this.randomArray(
            () => this.sampleBase64FileDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleCoordinatesDTO(template: Factory<CoordinatesDTO> = {}): CoordinatesDTO {
        const containerClass = "CoordinatesDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            lat: this.generate(
                template?.lat,
                { containerClass, propertyName: "lat", example: "null", isNullable: false },
                () => this.samplenumber()
            ),
            lon: this.generate(
                template?.lon,
                { containerClass, propertyName: "lon", example: "null", isNullable: false },
                () => this.samplenumber()
            ),
        };
    }

    sampleArrayCoordinatesDTO(
        template: Factory<CoordinatesDTO> = {},
        length?: number
    ): Array<CoordinatesDTO> {
        return this.randomArray(
            () => this.sampleCoordinatesDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleEmailDTO(template: Factory<EmailDTO> = {}): EmailDTO {
        const containerClass = "EmailDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            email: this.generate(
                template?.email,
                { containerClass, propertyName: "email", isNullable: false },
                () => this.sampleString("", "null")
            ),
            language: this.generate(
                template?.language,
                { containerClass, propertyName: "language", isNullable: false },
                () => this.sampleString("", "null")
            ),
        };
    }

    sampleArrayEmailDTO(
        template: Factory<EmailDTO> = {},
        length?: number
    ): Array<EmailDTO> {
        return this.randomArray(
            () => this.sampleEmailDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleHelpTypeDTO(): HelpTypeDTO {
        const containerClass = "HelpTypeDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return this.pickOne([
            HelpTypeDTO.VOLUNTEER,
            HelpTypeDTO.PUBLICORGANISATIONMEMBER,
            HelpTypeDTO.ARCHITECT,
            HelpTypeDTO.OTHER,
        ]);
    }

    sampleArrayHelpTypeDTO(length?: number): Array<HelpTypeDTO> {
        return this.randomArray(
            () => this.sampleHelpTypeDTO(),
            length ?? this.arrayLength()
        );
    }

    sampleMonumentDTO(template: Factory<MonumentDTO> = {}): MonumentDTO {
        const containerClass = "MonumentDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            id: this.generate(
                template?.id,
                { containerClass, propertyName: "id", isNullable: false },
                () => this.sampleString("", "null")
            ),
            name: this.generate(
                template?.name,
                { containerClass, propertyName: "name", isNullable: false },
                () => this.sampleString("", "null")
            ),
            address: this.generate(
                template?.address,
                { containerClass, propertyName: "address", isNullable: false },
                () => this.sampleString("", "null")
            ),
            description: this.generate(
                template?.description,
                { containerClass, propertyName: "description", isNullable: false },
                () => this.sampleString("", "null")
            ),
            constructionDate: this.generate(
                template?.constructionDate,
                { containerClass, propertyName: "constructionDate", isNullable: false },
                () => this.sampleString("", "null")
            ),
            destructionDate: this.generate(
                template?.destructionDate,
                { containerClass, propertyName: "destructionDate", isNullable: false },
                () => this.sampleString("", "null")
            ),
            type: this.generate(
                template?.type,
                { containerClass, propertyName: "type", example: "null", isNullable: false },
                () => this.sampleMonumentTypeDTO()
            ),
            status: this.generate(
                template?.status,
                { containerClass, propertyName: "status", example: "null", isNullable: false },
                () => this.sampleMonumentStatusDTO()
            ),
            level: this.generate(
                template?.level,
                { containerClass, propertyName: "level", example: "null", isNullable: false },
                () => this.sampleMonumentLevelDTO()
            ),
            ownership: this.generate(
                template?.ownership,
                { containerClass, propertyName: "ownership", example: "null", isNullable: false },
                () => this.sampleMonumentOwnershipDTO()
            ),
            coordinates: this.generate(
                template?.coordinates,
                { containerClass, propertyName: "coordinates", example: "null", isNullable: false },
                () => this.sampleCoordinatesDTO()
            ),
            photos: this.generate(
                template?.photos,
                { containerClass, propertyName: "photos", example: null, isNullable: false },
                () => this.sampleArrayPhotoDTO()
            ),
        };
    }

    sampleArrayMonumentDTO(
        template: Factory<MonumentDTO> = {},
        length?: number
    ): Array<MonumentDTO> {
        return this.randomArray(
            () => this.sampleMonumentDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleMonumentLevelDTO(): MonumentLevelDTO {
        const containerClass = "MonumentLevelDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return this.pickOne([
            MonumentLevelDTO.NATIONAL,
            MonumentLevelDTO.LOCAL,
            MonumentLevelDTO.NOREGISTER,
        ]);
    }

    sampleArrayMonumentLevelDTO(length?: number): Array<MonumentLevelDTO> {
        return this.randomArray(
            () => this.sampleMonumentLevelDTO(),
            length ?? this.arrayLength()
        );
    }

    sampleMonumentListDTO(template: Factory<MonumentListDTO> = {}): MonumentListDTO {
        const containerClass = "MonumentListDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            monuments: this.generate(
                template?.monuments,
                { containerClass, propertyName: "monuments", example: null, isNullable: false },
                () => this.sampleArrayMonumentDTO()
            ),
        };
    }

    sampleArrayMonumentListDTO(
        template: Factory<MonumentListDTO> = {},
        length?: number
    ): Array<MonumentListDTO> {
        return this.randomArray(
            () => this.sampleMonumentListDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleMonumentOwnershipDTO(): MonumentOwnershipDTO {
        const containerClass = "MonumentOwnershipDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return this.pickOne([
            MonumentOwnershipDTO.PRIVATE,
            MonumentOwnershipDTO.COMUN,
            MonumentOwnershipDTO.CONCESSION,
        ]);
    }

    sampleArrayMonumentOwnershipDTO(length?: number): Array<MonumentOwnershipDTO> {
        return this.randomArray(
            () => this.sampleMonumentOwnershipDTO(),
            length ?? this.arrayLength()
        );
    }

    sampleMonumentStatusDTO(): MonumentStatusDTO {
        const containerClass = "MonumentStatusDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return this.pickOne([
            MonumentStatusDTO.COMPLETELYDESTROYED,
            MonumentStatusDTO.PARTIALLYDESTROYED,
            MonumentStatusDTO.DAMAGED,
        ]);
    }

    sampleArrayMonumentStatusDTO(length?: number): Array<MonumentStatusDTO> {
        return this.randomArray(
            () => this.sampleMonumentStatusDTO(),
            length ?? this.arrayLength()
        );
    }

    sampleMonumentTypeDTO(): MonumentTypeDTO {
        const containerClass = "MonumentTypeDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return this.pickOne([
            MonumentTypeDTO.CHURCH,
            MonumentTypeDTO.COSTEL,
            MonumentTypeDTO.MUSEUM,
            MonumentTypeDTO.LIBRARY,
            MonumentTypeDTO.UNIVERSITY,
            MonumentTypeDTO.THEATRE,
            MonumentTypeDTO.MONUMENT,
            MonumentTypeDTO.OLDBUILDING,
            MonumentTypeDTO.ADMINISTRATIVEBUILDING,
        ]);
    }

    sampleArrayMonumentTypeDTO(length?: number): Array<MonumentTypeDTO> {
        return this.randomArray(
            () => this.sampleMonumentTypeDTO(),
            length ?? this.arrayLength()
        );
    }

    samplePersonHelpDTO(template: Factory<PersonHelpDTO> = {}): PersonHelpDTO {
        const containerClass = "PersonHelpDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            name: this.generate(
                template?.name,
                { containerClass, propertyName: "name", isNullable: false },
                () => this.sampleString("", "null")
            ),
            address: this.generate(
                template?.address,
                { containerClass, propertyName: "address", isNullable: false },
                () => this.sampleString("", "null")
            ),
            contactInformation: this.generate(
                template?.contactInformation,
                { containerClass, propertyName: "contactInformation", isNullable: false },
                () => this.sampleString("", "null")
            ),
            comment: this.generate(
                template?.comment,
                { containerClass, propertyName: "comment", isNullable: false },
                () => this.sampleString("", "null")
            ),
            type: this.generate(
                template?.type,
                { containerClass, propertyName: "type", example: "null", isNullable: false },
                () => this.sampleHelpTypeDTO()
            ),
        };
    }

    sampleArrayPersonHelpDTO(
        template: Factory<PersonHelpDTO> = {},
        length?: number
    ): Array<PersonHelpDTO> {
        return this.randomArray(
            () => this.samplePersonHelpDTO(template),
            length ?? this.arrayLength()
        );
    }

    samplePhotoDTO(template: Factory<PhotoDTO> = {}): PhotoDTO {
        const containerClass = "PhotoDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            id: this.generate(
                template?.id,
                { containerClass, propertyName: "id", isNullable: false },
                () => this.sampleString("", "null")
            ),
            monumentId: this.generate(
                template?.monumentId,
                { containerClass, propertyName: "monumentId", isNullable: false },
                () => this.sampleString("", "null")
            ),
            reportedMonumentId: this.generate(
                template?.reportedMonumentId,
                { containerClass, propertyName: "reportedMonumentId", isNullable: false },
                () => this.sampleString("", "null")
            ),
            publicFileUrl: this.generate(
                template?.publicFileUrl,
                { containerClass, propertyName: "publicFileUrl", isNullable: false },
                () => this.sampleString("", "null")
            ),
            originalFileName: this.generate(
                template?.originalFileName,
                { containerClass, propertyName: "originalFileName", isNullable: false },
                () => this.sampleString("", "null")
            ),
            createdAt: this.generate(
                template?.createdAt,
                { containerClass, propertyName: "createdAt", example: "null", isNullable: false },
                () => this.samplenumber()
            ),
        };
    }

    sampleArrayPhotoDTO(
        template: Factory<PhotoDTO> = {},
        length?: number
    ): Array<PhotoDTO> {
        return this.randomArray(
            () => this.samplePhotoDTO(template),
            length ?? this.arrayLength()
        );
    }

    sampleReportedMonumentDTO(template: Factory<ReportedMonumentDTO> = {}): ReportedMonumentDTO {
        const containerClass = "ReportedMonumentDTO";
        if (typeof this.sampleModelProperties[containerClass] === "function") {
            return this.sampleModelProperties[containerClass](this);
        }
        return {
            id: this.generate(
                template?.id,
                { containerClass, propertyName: "id", isNullable: false },
                () => this.sampleString("", "null")
            ),
            name: this.generate(
                template?.name,
                { containerClass, propertyName: "name", isNullable: false },
                () => this.sampleString("", "null")
            ),
            address: this.generate(
                template?.address,
                { containerClass, propertyName: "address", isNullable: false },
                () => this.sampleString("", "null")
            ),
            destructionDate: this.generate(
                template?.destructionDate,
                { containerClass, propertyName: "destructionDate", isNullable: false },
                () => this.sampleString("", "null")
            ),
            contactInformation: this.generate(
                template?.contactInformation,
                { containerClass, propertyName: "contactInformation", isNullable: false },
                () => this.sampleString("", "null")
            ),
            photos: this.generate(
                template?.photos,
                { containerClass, propertyName: "photos", example: null, isNullable: false },
                () => this.sampleArrayPhotoDTO()
            ),
        };
    }

    sampleArrayReportedMonumentDTO(
        template: Factory<ReportedMonumentDTO> = {},
        length?: number
    ): Array<ReportedMonumentDTO> {
        return this.randomArray(
            () => this.sampleReportedMonumentDTO(template),
            length ?? this.arrayLength()
        );
    }
}
