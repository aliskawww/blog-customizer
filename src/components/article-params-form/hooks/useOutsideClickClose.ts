import { useEffect } from 'react';

type UseOutsideClickClose = {
	articleParamsFormContainerRef: React.RefObject<HTMLDivElement>;
	isArticleParamsFormOpen: boolean;
	onArticleParamsFormClose: () => void;
};

export const useOutsideClickClose = ({
	articleParamsFormContainerRef,
	isArticleParamsFormOpen,
	onArticleParamsFormClose,
}: UseOutsideClickClose) => {
	useEffect(() => {
		if (!isArticleParamsFormOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;

			if (
				target instanceof Node &&
				!articleParamsFormContainerRef.current?.contains(target)
			) {
				onArticleParamsFormClose();
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);

		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [
		articleParamsFormContainerRef,
		isArticleParamsFormOpen,
		onArticleParamsFormClose,
	]);
};
