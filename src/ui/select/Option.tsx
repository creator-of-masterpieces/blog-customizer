import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type StyleKey = keyof typeof styles;
type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, className },
		onClick,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	// Добавил для правильной индексации элемента списка
	const key = props.option.optionClassName as StyleKey;
	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, key ? styles[key] : undefined)}
			value={value}
			onClick={handleClick(value)}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
