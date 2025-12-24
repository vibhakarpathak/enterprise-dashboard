import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>Revenue</Card.Header>
      <Card.Body>
        ₹1,24,000 this month
      </Card.Body>
    </Card>
  )
};
