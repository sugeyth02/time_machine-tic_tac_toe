import usePrevious from './usePrevious';

const useTimeMachine = <T>(index: T) => {
  const previousValue = usePrevious<T>(index);

  const getPreviousValue = () => previousValue[previousValue.length - 1];

  return { previousValue, getPreviousValue };
};

export default useTimeMachine;
