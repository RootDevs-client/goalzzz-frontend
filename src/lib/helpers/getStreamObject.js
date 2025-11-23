export default function getStreamObject(isFixtureStream) {
  if (isFixtureStream) {
    return [
      {
        stream_title: 'Server SD',
        platform: 'both',
        is_premium: '0',
        stream_status: '1',
        resolution: '480p',
        stream_url: 'dx',
        stream_type: 'root_stream',
        portrait_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        landscape_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        headers: [
          { key: 'Origin', value: '' },
          { key: 'Referer', value: '' },
        ],
        root_streams: [
          {
            root_stream_type: 'flussonic',
            root_stream_status: '1',
            root_stream_stream_url: 'dx',
            root_stream_stream_key: 'dx',
          },
        ],
      },
      {
        stream_title: 'Server HD',
        platform: 'both',
        is_premium: '0',
        stream_status: '0',
        resolution: '720p',
        stream_type: 'restricted',
        stream_url: 'dx',
        portrait_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        landscape_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        headers: [
          { key: 'Origin', value: 'dx' },
          { key: 'Referer', value: 'dx' },
        ],
        root_streams: [
          {
            root_stream_type: 'flussonic',
            root_stream_status: '1',
            root_stream_stream_url: 'dx',
            root_stream_stream_key: 'dx',
          },
        ],
      },
      {
        stream_title: 'Server HD',
        platform: 'both',
        is_premium: '0',
        stream_status: '1',
        resolution: '720p',
        stream_type: 'root_stream',
        stream_url: 'dx',
        portrait_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        landscape_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        headers: [
          { key: 'Origin', value: '' },
          { key: 'Referer', value: '' },
        ],
        root_streams: [
          {
            root_stream_type: 'flussonic',
            root_stream_status: '1',
            root_stream_stream_url: 'dx',
            root_stream_stream_key: 'dx',
          },
        ],
      },
      {
        stream_title: 'Server HD',
        platform: 'both',
        is_premium: '0',
        stream_status: '1',
        resolution: '720p',
        stream_type: 'root_stream',
        stream_url: 'dx',
        portrait_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        landscape_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        headers: [
          { key: 'Origin', value: '' },
          { key: 'Referer', value: '' },
        ],
        root_streams: [
          {
            root_stream_type: 'flussonic',
            root_stream_status: '1',
            root_stream_stream_url: 'dx',
            root_stream_stream_key: 'dx',
          },
        ],
      },
    ];
  } else {
    return [
      {
        stream_title: 'Server SD',
        platform: 'both',
        is_premium: '0',
        stream_status: '1',
        resolution: '480p',
        stream_url: '',
        portrait_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        landscape_watermark:
          '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
        headers: [
          { key: 'Origin', value: '' },
          { key: 'Referer', value: '' },
        ],
        root_streams: [
          {
            root_stream_type: 'flussonic',
            root_stream_status: '1',
            root_stream_stream_url: 'dx',
            root_stream_stream_key: 'dx',
          },
        ],
      },
    ];
  }
}
