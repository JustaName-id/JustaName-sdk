import { MessageWithReaction } from '../../../../utils/filterReactionsMessages';

interface ChatReactionOverlayProps {
  reactionMessage: MessageWithReaction | null;
  onOverlayClick: () => void;
}

export const ChatReactionOverlay: React.FC<ChatReactionOverlayProps> = ({
  reactionMessage,
  onOverlayClick,
}) => (
  <div
    style={{
      zIndex: 10001,
      position: 'absolute',
      top: '4px',
      left: '4px',
      right: '4px',
      bottom: '0px',
      width: '100%',
      minWidth: '412px',
      height: '100%',
      borderRadius: '16px',
      backdropFilter: reactionMessage ? 'blur(5px)' : 'none',
      pointerEvents: reactionMessage ? 'auto' : 'none',
    }}
    onClick={onOverlayClick}
  />
);
