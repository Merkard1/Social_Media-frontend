import { classNames } from "6_shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 12 : 4)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, view = ArticleView.SMALL, isLoading } = props;
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
    />
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});