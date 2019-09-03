export const adminLteConf = {
  skin: 'blue',
  // isSidebarLeftCollapsed: false,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal',
  sidebarLeftMenu: [
    {label: 'MENU DE NAVEGAÇÃO', separator: true},
    {label: 'Dashboard', route: '/', iconClasses: 'fa fa-dashboard'},
    {label: 'Cadastros', iconClasses: 'fa fa-keyboard-o', children: [
      {label: 'Cadastro de Vagas', route: 'cadastros/vagas'}
    ]},
    {label: 'Operação', route: '/operacao', iconClasses: 'fa fa-cogs'},
    {label: 'Relatórios', iconClasses: 'fa fa-bar-chart', children: [
        {label: 'Situação Estacionamento', route: 'relatorios/situacaoestacionamento'},
        {label: 'Movimento no Período', route: 'relatorios/movimentoperiodo'}
      ]}
  ]
};
