import useChangeEvent from './useChangeEvent';

const useLineInput = () => {
  const {
    value: lineInput,
    onChange: onChangeLineInput,
    setValue: setLineInput,
  } = useChangeEvent('');
  const {
    value: distance,
    onChange: onChangeDistance,
    setValue: setDistance,
  } = useChangeEvent('1');
  const {
    value: upStationId,
    onChange: onChangeUpStationId,
    setValue: setUpStationId,
  } = useChangeEvent('');
  const {
    value: downStationId,
    onChange: onChangeDownStationId,
    setValue: setDownStationId,
  } = useChangeEvent('');

  const resetForm = () => {
    setDistance('1');
    setUpStationId('');
    setDownStationId('');
  };

  return {
    lineInput,
    distance,
    upStationId,
    downStationId,
    onChangeLineInput,
    onChangeDistance,
    onChangeUpStationId,
    onChangeDownStationId,
    setDistance,
    setUpStationId,
    setDownStationId,
    setLineInput,
    resetForm,
  };
};

export default useLineInput;
