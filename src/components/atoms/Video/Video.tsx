import { Container } from './Video.styles';

interface VideoProps {
  src: string;
  loop: boolean;
  autoPlay: boolean;
  muted: boolean;
}

const Video = ({ src, loop, autoPlay, muted }: VideoProps) => {
  return (
    <Container src={src} loop={loop} autoPlay={autoPlay} muted={muted}>
      <source src={src} type="video/mp4" />
    </Container>
  );
};

export default Video;
