import { useTranslation } from "react-i18next";
import { classNames } from "6_shared/lib/classNames/classNames";
import Text, { TextTheme } from "6_shared/ui/Text/Text";
import Input from "6_shared/ui/Input/Input";
import { Loader } from "6_shared/ui/Loader/Loader";
import Avatar from "6_shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "5_entities/Currency";
import { Country, CountrySelect } from "5_entities/Country";
import { HStack, VStack } from "6_shared/ui/Stack";
import cls from "./ProfileCard.module.scss";
import { Profile } from "../../model/types/profile";

interface ProfileCardProps {
  className?: string;
  data?: Profile | undefined | null;
  error?: string | undefined | null;
  isLoading?: boolean;
  readOnly?: boolean;
  onChangeFormField: any;
}

const ProfileCard = (props : ProfileCardProps) => {
  const { data, className, error, isLoading, onChangeFormField, readOnly } = props;

  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <HStack className={classNames(cls.ProfileCard, {}, [cls.loading])} justify="center" max>
        <Loader />
      </HStack>);
  }

  if (error) {
    return (
      <HStack className={classNames(cls.ProfileCard, {}, [cls.error])} justify="center" max>
        <Text theme={TextTheme.ERROR} title={t("Some error")} text={t("Try reload page")} />
      </HStack>);
  }

  return (
    <VStack className={classNames(cls.ProfileCard, {}, [className])} gap="16" justify="center" align="center" max>
      {data?.avatar && (
        <div className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </div>)}
      <Input
        value={data?.username}
        placeholder={t("Your username")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("username", value)}
        readOnly={readOnly}
      />
      <Input
        value={data?.name}
        placeholder={t("Your Firstname")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("name", value)}
        readOnly={readOnly}
      />
      <Input
        value={data?.lastname}
        placeholder={t("Your Lastname")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("lastname", value)}
        readOnly={readOnly}
      />

      <Input
        value={Number(data?.age)}
        placeholder={t("Your Age")}
        className={cls.input}
        onChange={(value) => {
          if (!Number.isNaN(Number(value)) && Number(value) >= 1) {
            onChangeFormField("age", Number(value));
          }
        }}
        readOnly={readOnly}
      />

      <CountrySelect
        value={data?.country as Country}
        onChange={(value: string) => onChangeFormField("country", value)}
        readOnly={readOnly}
      />
      <Input
        value={data?.city}
        placeholder={t("Your city")}
        className={cls.input}
        onChange={(value: string) => onChangeFormField("city", value)}
        readOnly={readOnly}
      />
      <CurrencySelect
        value={data?.currency as Currency}
        onChange={(value: string) => onChangeFormField("currency", value)}
        readOnly={readOnly}
      />

    </VStack>
  );
};

export default ProfileCard;
