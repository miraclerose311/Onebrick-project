import { memo } from "react";

const TestModal = () => {
  return (
    <div className="absolute w-48 h-48 bg-sky-300 z-50 top-64 left-64">
      <p>This is Test Modal</p>;
    </div>
  );
};

const MemoTestModal = memo(TestModal);

export default MemoTestModal;
