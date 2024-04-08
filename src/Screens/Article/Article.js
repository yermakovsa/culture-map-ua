import mainS from "../../App.module.css";
import Footer from "../../Components/Footer/Footer";
import HeaderWhite from "../../Components/HeaderWhite/HeaderWhite";
import s from "./Article.module.css";
import { useState, useEffect } from "react";
import { monumentApi } from "../../api/apiDeclaration";
import { useParams } from "react-router-dom";

export default function Article() {
  const params = useParams();
  const [article, setArticle] = useState(null);

  const getArticle = async () => {
    try {
      const res = await monumentApi.getArticle({
        queryParams: { url: params.id },
      });
      setArticle(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div className={`${s.mainDiv} ${mainS.mainDiv}`}>
      <HeaderWhite />
      {article ? (
        <>
          <div
            className={s.head}
            style={{ backgroundImage: `url(${article.previewImageUrl})` }}
          >
            <div className={mainS.container}>
              <div className={s.headInfo}>
                <div className={s.name}>{article.name}</div>
                <div className={s.line}>
                  <div>{article.creationDate}</div>
                  <div>{article.author}</div>
                  <div>{article.numberOfViews}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={mainS.container}>
            <div className={s.content} dangerouslySetInnerHTML={{__html: article.article}}></div>
          </div>
        </>
      ) : null}

      <Footer />
    </div>
  );
}
