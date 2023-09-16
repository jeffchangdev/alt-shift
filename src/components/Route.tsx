import QRCode from 'react-qr-code';

export default function Route() {
  return (
    <div style={{ height: '100px', width: '100px' }}>
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value="www.google.com"
        viewBox="0 0 256 256"
      />
    </div>
  );
}
