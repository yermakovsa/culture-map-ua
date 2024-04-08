import mainS from "../../App.module.css";
import Footer from "../../Components/Footer/Footer";
import HeaderWhite from "../../Components/HeaderWhite/HeaderWhite";
import s from "./Blog.module.css";
import {useState, useEffect} from "react";
import { monumentApi } from "../../api/apiDeclaration";
import i18n from "../../i18n";
import { Link } from "react-router-dom";

export default function Blog() {

  const [articles, setArticles] = useState([])

  const getArticles = async () => {
    try{
      const res = await monumentApi.getArticleList({
        queryParams: {
          pageNumber: 0,
          pageSize: 5,
          language: i18n.language
        }
      })
      console.log(res)
      setArticles(res.articles)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  const ArticleList = articles.map((article) => {
    return (
      <Link to = {`/${i18n.language}/blog/${article.url}`} className={s.article} key = {article.id}>
        <img src = {article.previewImageUrl}/>
        <div className={s.name}>{article.name}</div>
        <div className={s.info}>
          <div>{article.creationDate}</div>
          <div>{article.numberOfViews}</div>
        </div>
      </Link>
    )
  })

  return (
    <div className={`${s.mainDiv} ${mainS.mainDiv}`}>
      <HeaderWhite />
      <div className={mainS.container}>
          <div className={s.title}>новини</div>
          <div className={s.articleContainer}>
            {ArticleList}
          </div>
      </div>
      <Footer />
    </div>
  );
}
