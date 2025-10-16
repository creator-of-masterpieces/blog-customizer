import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={null}
						options={fontFamilyOptions}
						placeholder={fontFamilyOptions[0].title}
						title={'шрифт'}></Select>

					<RadioGroup
						name={'fontSizeGroup'}
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						title={'размер шрифта'}></RadioGroup>

					<Select
						selected={fontColors[0]}
						options={fontColors}
						placeholder={fontFamilyOptions[0].title}
						title={'цвет фона'}></Select>

					<Separator></Separator>

					<Select
						selected={backgroundColors[0]}
						options={backgroundColors}
						placeholder={backgroundColors[0].title}
						title={'цвет фона'}></Select>

					<Select
						selected={contentWidthArr[0]}
						options={contentWidthArr}
						placeholder={contentWidthArr[0].title}
						title={'ширина контента'}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
