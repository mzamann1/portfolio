import { IconType } from "react-icons/lib";

interface IconProps {
    Icon: IconType;
    size?: number;
    className?: string;
  }
  
  const SkillIcon: React.FC<IconProps> = ({ Icon, size = 25, className = "" }) => {
    return <Icon size={size} className={className} />;
  };

  export default SkillIcon;