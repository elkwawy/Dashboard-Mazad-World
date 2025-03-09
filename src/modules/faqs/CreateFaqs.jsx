import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useCreateFaqsHook } from "./hooks/useCreateFaqsHook";

const CreateFaqs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: addNewFaq, isPending } = useCreateFaqsHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (formData) => {
    addNewFaq(formData, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Button type="primary" className="add-btn" onClick={showModal}>
        Add FAQ
      </Button>
      <Modal
        title="Create New FAQ"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            question: "",
            answer: "",
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
            <Input.TextArea
              placeholder="Enter answer"
              allowClear
              rows={3}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isPending} block>
            Add FAQ
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateFaqs;