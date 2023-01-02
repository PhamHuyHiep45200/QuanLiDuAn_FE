import React from "react";
import { Avatar, Button, Form, Input, Modal, Popover } from "antd";
import { CloseCircleOutlined, MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteComment, updateComment } from "../../../services/comment-task";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { async } from "@firebase/util";

function Comment({ e, getData }: any) {
  const [form] = Form.useForm();
  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const id_user: any = localStorage.getItem("id_user");
  const content = (
    <div className="last:border-b-0">
      <div
        className="hover:bg-[#f5f5f5] text-[12px] font-medium border-b-[1px] border-[#d3d3d3] last:border-b-0 py-[3px] px-10 cursor-pointer"
        onClick={() => setEdit(true)}
      >
        Sửa
      </div>
      <div
        className="hover:bg-[#ec2727] hover:text-[#fff] text-[12px] font-medium border-b-[1px] border-[#d3d3d3] last:border-b-0 py-[3px] px-10 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Xóa
      </div>
    </div>
  );
  const handleUpdateComment = async (value: any) => {
    const response = await updateComment(+e.id, { content: value.content });
    if (response?.data?.status === 200) {
      setEdit(false);
      getData();
    } else {
      openCustomNotificationWithIcon(
        "error",
        "Sửa bình luận",
        "Sửa bình luận thất bại"
      );
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const response = await deleteComment(+e?.id);
    if (response?.data?.status === 200) {
      getData();
    } else {
      openCustomNotificationWithIcon(
        "error",
        "Xóa bình luận",
        "Đã có lỗi xảy ra"
      );
    }
  };

  return (
    <div className="flex my-[5px] justify-between" key={e.id}>
      <div className="flex justify-start">
        <div>
          <Avatar size="small" src={e?.UserComment?.thumbnail} />
        </div>
        <div className="flex flex-col ml-[6px]">
          <span className="text-[13px] font-bold text-[#555]">
            {e.UserComment.firstName} {e.UserComment.lastName}
            <span className="text-[11px] text-[#999] ml-[10px] font-medium">
              {moment(e?.createdAt).fromNow()}
            </span>
          </span>
          <div className="flex-1 flex flex-col">
            {!edit ? (
              e.content
            ) : (
              <Form
                initialValues={{ content: e?.content }}
                form={form}
                onFinish={handleUpdateComment}
              >
                <Form.Item name="content" noStyle rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <div className="flex justify-end mt-[5px]">
                  <Button
                    danger
                    type="primary"
                    size="small"
                    onClick={() => setEdit(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    className="ml-[5px]"
                    htmlType="submit"
                  >
                    Lưu
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
      {e?.UserComment?.id === +id_user && (
        <Popover placement="left" title={false} content={content}>
          <MoreOutlined className="mt-[3px] cursor-pointer" />
        </Popover>
      )}
      <Modal
        open={open}
        onCancel={handleClose}
        title="Xóa bình luận"
        footer={false}
      >
        <span>Bạn có chắc chắn xóa bình luận?</span>
        <div className="mt-[10px] flex justify-end">
          <Button onClick={handleClose} className="mr-[10px]">
            Hủy
          </Button>
          <Button onClick={handleDelete} danger type="primary">
            Xóa
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Comment;
