import React, { useState } from "react";
import { Form, DatePicker, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
const { RangePicker } = DatePicker;

function TaskWorkMe({ form }: any) {
  const [fileList, setFileList] = useState<any[]>([]);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const handleChangeImage = async (value: any) => {
    setLoadingImage(true);
    const refImage = ref(storage, `/files/${value.file.name}`);
    const uploadChange = uploadBytesResumable(refImage, value.file);

    uploadChange.on(
      "state_changed",
      (snapshot) => {
        console.log(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadChange.snapshot.ref).then((url) => {
          const data = fileList;
          data.push({
            status: "done",
            url: url,
            id: Math.random(),
          });
          form.setFieldValue("thumbnail", data);
          setFileList([...data]);
          setLoadingImage(false);
        });
      }
    );
  };
  const handleDeleteImage = (value: any) => {
    const data = fileList;
    let position = 0;
    data.map((da, index) => {
      if (da.id === value.id) {
        position = index;
      }
    });
    data.splice(position, 1);
    setFileList([...data]);
    form.setFieldValue("thumbnail", data);
  };
  return (
    <div>
      <Form.Item
        label={<div className="min-w-[115px]">desription</div>}
        name="descriptions"
        rules={[{ required: true, message: "Please input your desription!" }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label={<div className="min-w-[115px]">estimate time</div>}
        name="estimate"
      >
        <RangePicker />
      </Form.Item>
      <Form.Item
        label={<div className="min-w-[115px]">desription</div>}
        name="thumbnail"
      >
        <Upload
          multiple
          directory={false}
          listType="picture-card"
          accept=".png, .jpg, .jpeg"
          fileList={fileList}
          customRequest={handleChangeImage}
          onRemove={(value) => handleDeleteImage(value)}
        >
          {loadingImage ? <Skeleton.Image active={true} /> : "+ Upload"}
        </Upload>
      </Form.Item>
    </div>
  );
}

export default TaskWorkMe;
