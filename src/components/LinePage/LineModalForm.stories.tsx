import LineModalForm from './LineModalForm';

export default {
  title: 'LinePage/LineModalForm',
  component: LineModalForm,
};

const Template = () => (
  <LineModalForm
    lineInfo={{
      name: '',
      color: '',
      upStationId: '',
      downStationId: '',
      distance: '',
    }}
    onChange={() => {}}
    onSubmit={() => {}}
    onModalClose={() => {}}
    stations={[]}
  />
);
export const Default = Template.bind({});
