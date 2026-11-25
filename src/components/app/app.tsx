import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [articleState, setArticleState] = useState(defaultArticleState);

  const toggle = (): void => setIsOpen(isOpen ? false : true);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        isOpen={isOpen}
        onClick={toggle}
        articleState={articleState}
        onSave={setArticleState}
        onCancel={() => setArticleState(defaultArticleState)}
      />
      <Article />
    </main>
  );
};
