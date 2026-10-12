import { PHOTOS } from './photos';

export function PhotoBackdrop({ visible, running }: { visible: boolean; running: boolean }) {
  return <div className="photo-backdrop" data-visible={visible} data-running={running} aria-hidden="true">
    <div className="photo-diagonals">
      {Array.from({ length: 5 }, (_, column) => {
        const pictures = Array.from({ length: 4 }, (_, row) => PHOTOS[(column * 3 + row) % PHOTOS.length]);
        return <div className={`photo-column column-${column} ${column % 2 ? 'going-down' : 'going-up'}`} key={column}>
          <div className="photo-column-track">
            {[0, 1].map(copy => <div className="photo-column-group" key={copy}>{pictures.map((photo, index) => <img key={index} src={photo.url} alt="" decoding="async" draggable={false} />)}</div>)}
          </div>
        </div>;
      })}
    </div>
    <div className="photo-paper-veil" />
  </div>;
}
