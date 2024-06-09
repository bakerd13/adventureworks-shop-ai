import { LayoutEnum, LayoutType } from "../../stores/preferenceStore";
import { Position, PositionEnum } from "../../types/messageProps";

const GetItemPosition = (itemId: string | number, id: string | number, layout: LayoutType): Position => {
  if (layout === LayoutEnum.Staggered) {
    return itemId === id ? PositionEnum.Right : PositionEnum.Left
  }

  return PositionEnum.Center;
}

export default GetItemPosition;
