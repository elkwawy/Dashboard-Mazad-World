import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useUpdateFaqsHook } from "./hooks/useUpdateFaqsHook";
import { EditFilled } from "@ant-design/icons";

const UpdateFaqs = ({ faq }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateFaq, isPending } = useUpdateFaqsHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    updateFaq(
      { faqId: faq.id, faqData: formData },
      {
        onSuccess: () => {
          handleCancel();
        },
      }
    );
  };

  return (
    <>
      <Button
        size="middle"
        type="primary"
        title="Edit FAQ"
        onClick={showModal}
      >
        <EditFilled />
      </Button>
      <Modal
        title="Update FAQ"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            question: faq.question || "",
            answer: faq.answer || "",
          }}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Question is required" }]}
          >
            <Input placeholder="Enter question" allowClear />
          </Form.Item>

          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Answer is required" }]}
          >
            <Input.TextArea placeholder="Enter answer" allowClear rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Update FAQ
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateFaqs;