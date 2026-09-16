import { FormEvent, useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (newArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isArticleParamsFormOpen, setIsArticleParamsFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const articleParamsFormContainerRef = useRef<HTMLDivElement>(null);

	const handleCloseForm = useCallback(() => {
		setIsArticleParamsFormOpen(false);
	}, []);

	useOutsideClickClose({
		articleParamsFormContainerRef,
		isArticleParamsFormOpen,
		onArticleParamsFormClose: handleCloseForm,
	});

	const handleToggleForm = () => {
		setIsArticleParamsFormOpen(
			(currentIsArticleParamsFormOpen) => !currentIsArticleParamsFormOpen
		);
	};

	const handleChange =
		(fieldName: keyof ArticleStateType) => (selectedOption: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: selectedOption,
			}));
		};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={articleParamsFormContainerRef}>
			<ArrowButton
				isSidebarOpen={isArticleParamsFormOpen}
				onClick={handleToggleForm}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isArticleParamsFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.title}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
