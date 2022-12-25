import { type ReactNode, type FC } from "react";

type Props = {
  onClick: () => Promise<void>;
  isLoading: string;
  children: ReactNode | string;
};

export const Button: FC<Props> = ({ onClick, isLoading, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-40 items-center justify-center rounded-full bg-[#a768fe] px-5 py-2 text-sm text-white hover:bg-[#532c89] md:w-80 md:text-2xl"
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 animate-spin md:h-10 md:w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>{isLoading}</span>
        </div>
      ) : (
        children 
      )}
    </button>
  );
};
