import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [presentArticleState, setPresentArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': presentArticleState.fontFamilyOption.value,
					'--font-size': presentArticleState.fontSizeOption.value,
					'--font-color': presentArticleState.fontColor.value,
					'--container-width': presentArticleState.contentWidth.value,
					'--bg-color': presentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				presentArticleState={presentArticleState}
				setPresentArticleState={setPresentArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
