const playlists = [
  {
    name: 'Ambient Coffee Morning',
    url: 'https://open.spotify.com/user/1155899437/playlist/6qaUi2aj8Wtwkrrmzvqdmd',
    hour: 8,
    minute: 30,
  }, {
  //  name: 'Beautifully Chilled Electronica',
  //  url: 'https://open.spotify.com/user/1155899437/playlist/2XFGVQwJ0D9uvSImoOrC9w',
  //  hour: 8,
  //  minute: 30,
  //}, {
  //  name: 'Classic rock relaxation',
  //  url: 'https://open.spotify.com/user/22r22vrehfvv2pa54va2mn5ya/playlist/1OOqD9kQCal0C1g90Rfqai',
  //  hour: 8,
  //  minute: 30,
  //}, {
  //  name: 'K-Pop All Stars',
  //  url: 'https://open.spotify.com/user/angel--zero--/playlist/6Rw9xsZlycCcWcLVVTH7tr',
  //  hour: 10,
  //  minute: 30,
  //}, {
    name: 'Classic Country',
    url: 'https://open.spotify.com/user/carter.santos/playlist/5bXZLtnfqq2UbTEcZaHbqF',
    hour: 10,
    minute: 30,
  }, {
    name: 'Classic rock/pop 80\'s',
    url: 'https://open.spotify.com/user/1281672208/playlist/7iovz3ZXq7xypgK5zkkprc',
    hour: 13,
    minute: 0,
  }, {
    name: 'Louis The Child - Radio',
    url: 'https://open.spotify.com/user/1144330891/playlist/3TwtYYOux2ogFw7C970YcI',
    hour: 16,
    minute: 0,
  },
];

const schedules = playlists.map(p => {
  const matches = p.url.match('https://open.spotify.com/user/(.*)/playlist/(.*)');
  const user_id = matches[1];
  const playlist_id = matches[2];
  p.playlist = `spotify:user:${user_id}:playlist:${playlist_id}:play`;
  return p;
});

console.log(print_xml(schedules));

function render_task(schedule, index) {
  const time = Date.now(); // TODO
  const task_id = 1 + (index * 2); // TODO
  const {playlist, name} = schedule;

  return `
  <Task sr="task${task_id}">
    <cdate>${time}</cdate>
    <edate>${time + 1}</edate>
    <id>${task_id}</id>
    <nme>${name}</nme>
    <pri>100</pri>
    <Action sr="act0" ve="7">
      <code>20</code>
      <App sr="arg0">
        <appClass>com.spotify.music.MainActivity</appClass>
        <appPkg>com.spotify.music</appPkg>
        <label>Spotify</label>
      </App>
      <Str sr="arg1" ve="3"/>
      <Int sr="arg2" val="0"/>
      <Int sr="arg3" val="0"/>
    </Action>
    <Action sr="act1" ve="7">
      <code>30</code>
      <Int sr="arg0" val="0"/>
      <Int sr="arg1" val="1"/>
      <Int sr="arg2" val="0"/>
      <Int sr="arg3" val="0"/>
      <Int sr="arg4" val="0"/>
    </Action>
    <Action sr="act2" ve="7">
      <code>877</code>
      <Str sr="arg0" ve="3">android.media.action.MEDIA_PLAY_FROM_SEARCH</Str>
      <Int sr="arg1" val="1"/>
      <Str sr="arg2" ve="3"/>
      <Str sr="arg3" ve="3">${playlist}</Str>
      <Str sr="arg4" ve="3"/>
      <Str sr="arg5" ve="3"/>
      <Str sr="arg6" ve="3"/>
      <Str sr="arg7" ve="3"/>
      <Str sr="arg8" ve="3"/>
      <Int sr="arg9" val="1"/>
    </Action>
    <Action sr="act3" ve="7">
      <code>30</code>
      <Int sr="arg0" val="0"/>
      <Int sr="arg1" val="1"/>
      <Int sr="arg2" val="0"/>
      <Int sr="arg3" val="0"/>
      <Int sr="arg4" val="0"/>
    </Action>
    <Action sr="act4" ve="7">
      <code>877</code>
      <Str sr="arg0" ve="3">com.spotify.mobile.android.ui.widget.NEXT</Str>
      <Int sr="arg1" val="0"/>
      <Str sr="arg2" ve="3"/>
      <Str sr="arg3" ve="3"/>
      <Str sr="arg4" ve="3"/>
      <Str sr="arg5" ve="3"/>
      <Str sr="arg6" ve="3"/>
      <Str sr="arg7" ve="3">com.spotify.music</Str>
      <Str sr="arg8" ve="3"/>
      <Int sr="arg9" val="0"/>
    </Action>
  </Task>`;
}

function render_profile(schedule, index) {
  const id = (index * 2) + 2;
  const time = Date.now();
  const task_id = 1 + (index * 2);
  const {hour, minute} = schedule;

  return `
  <Profile sr="prof${id}" ve="2">
    <cdate>${time}</cdate>
    <edate>${time + 1}</edate>
    <id>${id}</id>
    <mid0>${task_id}</mid0>
    <Time sr="con0">
      <fh>${hour}</fh>
      <fm>${minute}</fm>
      <th>-1</th>
      <tm>-1</tm>
    </Time>
  </Profile>`;
}

function render_project(profiles, tasks) {
  const time = Date.now();

  return `
  <Project sr="proj0" ve="2">
    <cdate>${time}</cdate>
    <mdate>${time + 1}</mdate>
    <name>Base</name>
    <pids>${profiles.join(',')}</pids>
    <tids>${tasks.join(',')}</tids>
    <Img sr="icon" ve="2">
      <nme>mw_action_home</nme>
    </Img>
  </Project>`;
}

function print_xml(schedules) {
  let profiles_xml = schedules.map(render_profile);
  let tasks_xml = schedules.map(render_task);

  let profiles = profiles_xml.map((p, i) => (i * 2) + 2);
  let tasks = tasks_xml.map((p, i) => 1 + (i * 2));

  let project_xml = render_project(profiles, tasks);

  return `<TaskerData sr="" dvi="1" tv="5.0u6m">${profiles_xml.join('')}${project_xml}${tasks_xml.join('')}
</TaskerData>`;
}
