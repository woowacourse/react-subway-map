import LineModalForm from './LineModalForm';

export default {
  title: 'LinePage/LineModalForm',
  component: LineModalForm,
};

const Template = () => (
  <LineModalForm
    lines={[]}
    lineInfo={{
      name: '',
      color: '',
      upStationId: '',
      downStationId: '',
      distance: '',
    }}
    onChange={() => {}}
    onSubmit={() => {}}
    onCloseModal={() => {}}
    stations={[]}
  />
);
export const Default = Template.bind({});
