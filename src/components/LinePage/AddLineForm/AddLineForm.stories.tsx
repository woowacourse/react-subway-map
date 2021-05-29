import AddLineForm from './AddLineForm';

export default {
  title: 'LinePage/AddLineForm',
  component: AddLineForm,
};

const Template = () => <AddLineForm lines={[]} stations={[]} addLine={() => {}} />;
export const Default = Template.bind({});
