import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  isOpen: boolean;
  onClick: () => void;
  articleState: ArticleStateType;
  onSave: (data: ArticleStateType) => void;
  onCancel: () => void;
};

export const ArticleParamsForm = ({
  isOpen,
  onClick,
  articleState,
  onSave,
  onCancel,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [articleStyles, setArticleStyles] = useState<ArticleStateType>(articleState);

  const updateArticleStyles = (
    field: keyof ArticleStateType,
    value: OptionType
  ): void => {
    setArticleStyles((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => setArticleStyles(articleState), [articleState]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onClick} />
      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...articleStyles });
          }}
          onReset={onCancel}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            selected={articleStyles.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(value) => updateArticleStyles('fontFamilyOption', value)}
            title="Шрифт"
          />

          <RadioGroup
            name="font-size"
            selected={articleStyles.fontSizeOption}
            options={fontSizeOptions}
            onChange={(value) => updateArticleStyles('fontSizeOption', value)}
            title="Размер шрифта"
          />

          <Select
            selected={articleStyles.fontColor}
            options={fontColors}
            onChange={(value) => updateArticleStyles('fontColor', value)}
            title="Цвет шрифта"
          />

          <Separator />

          <Select
            selected={articleStyles.backgroundColor}
            options={backgroundColors}
            onChange={(value) => updateArticleStyles('backgroundColor', value)}
            title="Цвет фона"
          />

          <Select
            selected={articleStyles.contentWidth}
            options={contentWidthArr}
            onChange={(value) => updateArticleStyles('contentWidth', value)}
            title="Ширина контента"
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
