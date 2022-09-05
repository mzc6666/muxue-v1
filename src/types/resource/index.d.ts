/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-28 16:52:47
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-29 23:02:25
 */
declare interface PermissionEvents {
  onDownload?: () => void;
  onShare?: () => void;
  onOpenResource?: () => void;
  onCollect?: () => void;
  onMove?: () => void;
  onRename?: () => void;
  onDetails?: () => void;
  onDelete?: () => void;
}

declare interface ResourceOptions {
  sId: number;
  sName: string;
  updateTime: string;
  isPublic: 0 | 1 | 2; // 0 --> 我的收藏内的资源; 1 --> 非公开;  2 --> 公开
  size: number;
}

declare interface DropDownItem {
  key: "download" | "share";
  label: string;
}

declare function DropDownFn(): DropDownItem;
