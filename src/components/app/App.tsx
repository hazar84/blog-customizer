import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
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
