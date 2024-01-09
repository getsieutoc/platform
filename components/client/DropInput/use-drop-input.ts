import { DragEventHandler, useCallback, useEffect, useRef, useState } from 'react';

export type UseDropInputOptions = {
  onFiles: (files: File[]) => void;
};

export const useDropInput = ({ onFiles }: UseDropInputOptions) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOver, setOver] = useState(false);

  const onDrop: DragEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.persist();

      setOver(false);

      const { dataTransfer } = event;

      if (dataTransfer === null) return;

      onFiles(Array.from(dataTransfer.files));
    },
    [onFiles]
  );

  const onDragOver: DragEventHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDragEnter: DragEventHandler = useCallback((event) => {
    event.preventDefault();
    setOver(true);
  }, []);

  const onDragLeave: DragEventHandler = useCallback(() => {
    setOver(false);
  }, []);

  const onInputChangeHandler = useCallback(() => {
    const inputElement = inputRef?.current;

    if (!inputElement || !inputElement.files) {
      return;
    }

    onFiles(Array.from(inputElement.files));
  }, [onFiles, inputRef]);

  useEffect(() => {
    const inputElement = inputRef?.current;

    if (!inputElement) {
      return undefined;
    }

    inputElement.addEventListener('change', onInputChangeHandler);

    return () => {
      inputElement.removeEventListener('change', onInputChangeHandler);
    };
  }, [inputRef, onFiles, onInputChangeHandler]);

  return {
    inputRef,
    isOver,
    onDrop,
    onDragOver,
    onDragEnter,
    onDragLeave,
  };
};
