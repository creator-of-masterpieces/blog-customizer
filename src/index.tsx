import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export interface IFormTypeData {
	'--font-family': OptionType | null;
	'--font-size': OptionType | null;
	'--font-color': OptionType | null;
	'--container-width': OptionType | null;
	'--bg-color': OptionType | null;
}

const App = () => {
	const [formData, setFormData] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});

	function normalizeFormData(data: IFormTypeData) {
		const result: Record<keyof IFormTypeData, string> = {
			'--font-family': '',
			'--font-size': '',
			'--font-color': '',
			'--container-width': '',
			'--bg-color': '',
		};

		for (const key of Object.keys(data) as Array<keyof IFormTypeData>) {
			result[key] = data[key]?.value ?? '';
		}

		return result;
	}
	function handlerFormData(data: IFormTypeData) {
		setFormData(normalizeFormData(data));
	}

	return (
		<main className={clsx(styles.main)} style={formData as CSSProperties}>
			<ArticleParamsForm onSubmit={handlerFormData} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
