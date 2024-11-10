import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRouteArticleEdit, getRouteArticles } from "@/1_app/config/routeConfig/routeConfig";

import { useArticleDetailsData } from "@/5_entities/Article/model/selectors/articleDetails";

import { Button, ThemeButton } from "@/6_shared/ui/deprecated/Button";
import { HStack } from "@/6_shared/ui/redesigned/Stack";

import { getCanEditArticle } from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
 className?: string
}

const ArticleDetailsPageHeader = ({ className } : ArticleDetailsPageHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const article = useArticleDetailsData();

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEdit = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [navigate, article]);

  return (
    <HStack justify="between" max>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        {t("Back")}
      </Button>
      {canEdit && (
        <Button theme={ThemeButton.OUTLINE} onClick={onEdit}>
          {t("Edit")}
        </Button>
      )}
    </HStack>
  );
};

export default ArticleDetailsPageHeader;
