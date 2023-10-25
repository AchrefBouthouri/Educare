export interface Comment {
    idComm: number;
    createdAt: string;
    description: string;
    sujet: string;
    upvotes: number;
    downvotes: number;
    reports: number;
    archive: boolean;
    is_a_post: boolean;
    username: string;
    is_parent: boolean;
    parent_id: number;
    is_edited: boolean;
    id_previous: number;
    subComments: Comment[];
    parent: any;
    iduser: number;
    showSubCommentsFlag: boolean;
    showReplyInput :boolean;
  }