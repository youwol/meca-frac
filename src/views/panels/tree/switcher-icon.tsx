import React from "react";
import { TreeNodeProps } from "rc-tree";
import { SvgIcon } from "../../../components/icons/svg-icon";
import FolderCloseIcon from "../../../assets/tree-view/folder_closed_icon_dark.svg";
import FolderOpenIcon from "../../../assets/tree-view/folder_open_icon_dark.svg";
import TriIcon from "../../../assets/tree-view/tri_surf_icon.svg";
import DownIcon from "../../../assets/down_icon.svg";
import NextIcon from "../../../assets/next_icon.svg";
import { DataNode } from "rc-tree/lib/interface";

const getSvgIcon = (datas: TreeNodeProps<DataNode>) => (
  <i className={"d-flex align-items-center"}>
    <SvgIcon
      customClass={"me-2"}
      icon={datas.expanded && !datas.isLeaf ? DownIcon : NextIcon}
    />
    <SvgIcon
      customClass={"me-1"}
      icon={datas.expanded && !datas.isLeaf ? FolderOpenIcon : FolderCloseIcon}
      onclick={(ev: Event) => {
        ev?.stopPropagation();
      }}
    />
  </i>
);

export const switcherIcon = (data: TreeNodeProps) => {
  if (data.isLeaf) {
    return (
      <div className={"d-flex me-1"}>
        <SvgIcon icon={TriIcon} fill={"red"} />
      </div>
    );
  }

  return getSvgIcon(data);
};
