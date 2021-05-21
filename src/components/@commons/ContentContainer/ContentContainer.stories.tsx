import ContentContainer, { Props } from './ContentContainer';

export default {
  title: 'ContentContainer ',
  component: ContentContainer,
  argTypes: {},
};

const Template = (args: Props) => <ContentContainer {...args} />;
export const Default = Template.bind({});
