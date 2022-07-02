import { CSSProperties } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

interface Props {
  color?: string;
  loading: boolean;
  size?: number;
  override?: CSSProperties;
}
const ClimbingBoxLoaderComponent = ({ loading }: Props) => (
  <ClimbingBoxLoader color="rgba(30, 144, 255, 1)" loading={loading} />
);
export { ClimbingBoxLoaderComponent as ClimbingBoxLoader };
