import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null; // выбранный пункт (или null, если ничего не выбрано)
	options: OptionType[]; // список всех доступных пунктов
	placeholder?: string; // текст-заглушка, если ничего не выбрано
	onChange?: (selected: OptionType) => void; // вызывается при выборе пункта
	onClose?: () => void; // вызывается при закрытии выпадающего списка
	title?: string; // заголовок над селектом (например "Шрифт")
};

// Компонент Select — универсальный выпадающий список
export const Select = (props: SelectProps) => {
	const { options, placeholder, selected, onChange, onClose, title } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// ref на корневой элемент селекта (нужен для отслеживания кликов вне компонента)
	const rootRef = useRef<HTMLDivElement>(null);
	// ref на область с placeholder (нужен для работы кастомного хука useEnterSubmit)
	const placeholderRef = useRef<HTMLDivElement>(null);
	// Вытаскиваем CSS-класс для выделения выбранной опции, если он есть
	const optionClassName = selected?.optionClassName ?? '';

	// Хук, который закрывает селект при клике вне него
	// (использует rootRef для отслеживания области клика)
	useOutsideClickClose({
		isOpen, // передаём текущее состояние (открыт ли селект)
		rootRef, // ссылка на корневой элемент
		onClose, // коллбэк при закрытии (если задан)
		onChange: setIsOpen, // функция для изменения состояния isOpen
	});

	// Хук, который позволяет закрывать селект клавишей Enter
	useEnterSubmit({
		placeholderRef, // ссылка на placeholder (куда нажимают Enter)
		onChange: setIsOpen, // функция, меняющая состояние isOpen
	});

	// Обработчик клика по пункту меню.
	// Вызывается при выборе элемента из списка
	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false); // закрываем список
		onChange?.(option); // вызываем onChange из пропсов, передаём выбранный элемент
	};

	// Обработчик клика по placeholder (открывает/закрывает список)
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen); // инвертируем состояние
	};

	return (
		<div className={styles.container}>
			{/* Если передан title, выводим заголовок над селектом */}
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
				</>
			)}

			{/* Обёртка всего селекта */}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}
				data-testid='selectWrapper'>
				{/* Иконка стрелки */}
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
				{/* Placeholder — зона, по которой кликают для открытия списка */}
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName]
					)}
					data-status={status}
					data-selected={!!selected?.value} // true, если что-то выбрано
					onClick={handlePlaceHolderClick} // открывает/закрывает селект
					role='button' // делает элемент "доступным" для навигации
					tabIndex={0} // чтобы можно было фокусироваться через клавиатуру
					ref={placeholderRef} // ссылка для Enter-нажатий
				>
					{/* Текст в placeholder: либо выбранный пункт, либо заглушка */}
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>

				{/* Выпадающий список опций — рендерится только если isOpen === true */}
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{/* Фильтруем, чтобы не показывать уже выбранную опцию */}
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value} // уникальный ключ React
									option={option} // сам объект опции
									onClick={() => handleOptionClick(option)} // обработчик выбора
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
