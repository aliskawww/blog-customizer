import { useEffect } from 'react';

type UseOutsideClickClose = {
	isSelectDropdownOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	selectWrapperRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isSelectDropdownOpen,
	selectWrapperRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!selectWrapperRef.current?.contains(target)
			) {
				isSelectDropdownOpen && onClose?.();
				onChange?.(false);
			}
		};

		if (!isSelectDropdownOpen) {
			return;
		}

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isSelectDropdownOpen]);
};
