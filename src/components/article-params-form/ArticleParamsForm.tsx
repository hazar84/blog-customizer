import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	presentArticleState: ArticleStateType;
	setPresentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	presentArticleState,
	setPresentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [chooseArticleState, setChooseArticleState] =
		useState<ArticleStateType>(presentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setChooseArticleState({ ...chooseArticleState, [key]: value });
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	});

	const onCancel = () => {
		setChooseArticleState(presentArticleState);
		setIsOpen;
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={setIsOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						setPresentArticleState(chooseArticleState);
					}}>
					<Text as='h2' size={31} weight={800} family='open-sans' uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={chooseArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						selected={chooseArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='Размер шрифта'
					/>
					<Select
						selected={chooseArticleState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={chooseArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={chooseArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onCancel}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
