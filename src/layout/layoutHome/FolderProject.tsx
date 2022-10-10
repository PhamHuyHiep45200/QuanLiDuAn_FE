import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styles from "../../styles/layout.module.scss";
import { Space, Typography } from "antd";
import {
  CheckOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const reorder = (list:any, startIndex:any, endIndex:any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface FolderProjectProps {
  menuFolderProject: Array<any>;
  setMenuFolderProject: React.Dispatch<React.SetStateAction<any>>;
}

function FolderProject(props: FolderProjectProps) {
  const {
    menuFolderProject,
    setMenuFolderProject,
  } = props;
  const navigate = useNavigate();
  const [checkList, setCheckList] = React.useState<boolean>(false);
  const [hidenList, setHidenList] = React.useState<boolean>(true);

  const onDragEnd = (result:any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      menuFolderProject,
      result.source.index,
      result.destination.index
    );

    setMenuFolderProject(items);
  };
  const handleUpDow = () => {
    if (checkList) {
      setHidenList(true);
    } else {
      setHidenList(false);
    }
    setCheckList(!checkList);
  };

  return (
    <div>
      <Space className={styles.menuFolderProject} onClick={handleUpDow}>
        <Space>
          <CheckOutlined />
          Mục yêu thích
        </Space>
        {checkList ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </Space>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided:any, snapshot:any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                height: `${menuFolderProject.length * 40}px`,
                display: `${hidenList ? "block" : "none"}`,
              }}
            >
              {menuFolderProject.map((item: any, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided:any, snapshot:any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.menuFolderProjectChildren}
                    >
                      <Space>
                        {item.iconBefore}
                        <Text onClick={() => navigate(item.path)}>
                          {item.name}
                        </Text>
                      </Space>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default FolderProject;
