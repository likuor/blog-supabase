export type PostType = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export type AddPostType = {
  title: string | undefined;
  description: string | undefined;
};
