export type MessageInfo = {
  type: string;
  senderID: string;
  body: string;
  threadID: string;
  messageID: string;
  attachments: Attachment[];
  mentions: Mentions;
  timestamp: string;
  isGroup: boolean;
};

interface Mentions {}

interface Attachment {
  type: string;
  ID: string;
  url: string;
  packID: string;
  spriteUrl?: any;
  spriteUrl2x?: any;
  width: number;
  height: number;
  caption: string;
  description: string;
  frameCount: number;
  frameRate: number;
  framesPerRow: number;
  framesPerCol: number;
  stickerID: string;
  spriteURI?: any;
  spriteURI2x?: any;
}
