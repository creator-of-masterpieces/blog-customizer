import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { IFormTypeData } from 'src/index';

import styles from './ArticleParamsForm.module.scss';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

export interface IArticleParamsFormProps {
	onSubmit: (data: IFormTypeData) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<IArticleParamsFormProps> = ({
	onSubmit,
	onReset,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentFont, setCurrentFont] = useState<OptionType | null>(
		defaultArticleState.fontFamilyOption
	);
	const [currentFontColor, setCurrentFontColor] = useState<OptionType | null>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType | null>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType | null>(
		defaultArticleState.contentWidth
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	const articleParamsFormRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		// Обработчик закрытия окна по Esc
		function escapeHandler(evt: KeyboardEvent) {
			evt.key === 'Escape' && setIsOpen(false);
		}

		// Обработчик закрытия окна по клику вне окна
		function handleClickOutside(evt: MouseEvent) {
			if (
				articleParamsFormRef.current &&
				evt.target instanceof Node &&
				!articleParamsFormRef.current.contains(evt.target)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('keydown', escapeHandler);
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('keydown', escapeHandler);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Обработчик клика по опции выбора шрифта
	function fontOptionClickHandler(selectedOption: OptionType) {
		setCurrentFont(selectedOption);
	}

	// Обработчик клика по опции выбора цвета текста
	function colorOptionClickHandler(selectedOption: OptionType) {
		setCurrentFontColor(selectedOption);
	}

	// Обработчик клика по опции выбора цвета фона
	function backgroundColorOptionClickHandler(selectedOption: OptionType) {
		setBackgroundColor(selectedOption);
	}

	// Обработчик клика по опции выбора ширины контента страницы
	function contentWidthOptionClickHandler(selectedOption: OptionType) {
		setContentWidth(selectedOption);
	}

	// Обработчик клика по опции выбора размера шрифта
	function fontSizeOptionClickHandler(selectedOption: OptionType) {
		setFontSize(selectedOption);
	}

	// Обработчик отправки формы
	function handleFormSubmit(evt: SyntheticEvent) {
		evt.preventDefault();
		onSubmit({
			'--font-family': currentFont,
			'--font-size': fontSize,
			'--font-color': currentFontColor,
			'--container-width': contentWidth,
			'--bg-color': backgroundColor,
		});
	}

	// Сбрасывает значение полей формы до дефолтных
	function resetForm() {
		setCurrentFont(defaultArticleState.fontFamilyOption);
		setCurrentFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
		onReset();
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={articleParamsFormRef}>
				<form
					className={styles.form}
					ref={articleParamsFormRef}
					onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={currentFont}
						options={fontFamilyOptions}
						placeholder={fontFamilyOptions[0].title}
						title={'шрифт'}
						onChange={fontOptionClickHandler}></Select>

					<RadioGroup
						name={'fontSizeGroup'}
						selected={fontSize}
						options={fontSizeOptions}
						title={'размер шрифта'}
						onChange={fontSizeOptionClickHandler}></RadioGroup>

					<Select
						selected={currentFontColor}
						options={fontColors}
						placeholder={fontColors[0].title}
						title={'цвет шрифта'}
						onChange={colorOptionClickHandler}></Select>

					<Separator></Separator>

					<Select
						selected={backgroundColor}
						options={backgroundColors}
						placeholder={backgroundColors[0].title}
						title={'цвет фона'}
						onChange={backgroundColorOptionClickHandler}></Select>

					<Select
						selected={contentWidth}
						options={contentWidthArr}
						placeholder={contentWidthArr[0].title}
						title={'ширина контента'}
						onChange={contentWidthOptionClickHandler}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => resetForm()}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
