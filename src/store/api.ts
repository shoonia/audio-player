interface AudioData {
  readonly time: number;
  readonly url?: string;
}

const apiUrl = 'https://shoonia.wixsite.com/my-site-5/_functions/audio';

export const sendAudioData = (data: AudioData): boolean =>
  navigator.sendBeacon(
    apiUrl,
    new Blob([JSON.stringify(data)])
  );

export const getAudioData = async (): Promise<AudioData> => {
  const response = await fetch(apiUrl);
  return response.json();
};
