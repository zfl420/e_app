// 版本样式配置 - 为每个版本定义独立的布局和样式
export interface VersionStyles {
  header: {
    container: string;
    paddingBottom: string;
    searchBarMargin: string;
  };
  banner: {
    container: string;
    margin: string;
    borderRadius: string;
  };
  bottomNav: {
    container: string;
    itemActive: string;
    itemInactive: string;
  };
  profile: {
    container: string;
    headerSection: string;
  };
  mainContainer: {
    background: string;
    container: string;
  };
  overlay: {
    background: string;
    container: string;
  };
  categoryGrid: {
    container: string;
  };
  storeCard: {
    container: string;
  };
}

// 版本1样式 - 基础版
export const version1Styles: VersionStyles = {
  header: {
    container: 'bg-primary',
    paddingBottom: 'pb-6',
    searchBarMargin: 'mb-0',
  },
  banner: {
    container: 'mx-4 mt-4 mb-4 rounded-2xl',
    margin: 'mx-4',
    borderRadius: 'rounded-2xl',
  },
  bottomNav: {
    container: 'bg-white border-t border-gray-200',
    itemActive: 'text-secondary fill-current',
    itemInactive: 'text-gray-400',
  },
  profile: {
    container: 'bg-gray-50',
    headerSection: 'bg-white',
  },
  mainContainer: {
    background: 'bg-background',
    container: 'bg-gray-50',
  },
  overlay: {
    background: 'bg-background',
    container: 'bg-white',
  },
  categoryGrid: {
    container: 'mx-4 mb-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100',
  },
  storeCard: {
    container: 'mx-4 -mt-16 relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-4',
  },
};

// 版本2样式 - 首页和版本1保持一致，但增加沟通和询价单TAB
export const version2Styles: VersionStyles = {
  header: {
    container: 'bg-primary',
    paddingBottom: 'pb-[5px]',
    searchBarMargin: 'mb-6',
  },
  banner: {
    container: 'mx-4 mt-3 mb-3 rounded-2xl',
    margin: 'mx-4',
    borderRadius: 'rounded-2xl',
  },
  bottomNav: {
    container: 'bg-white border-t border-gray-200',
    itemActive: 'text-secondary fill-current',
    itemInactive: 'text-gray-400',
  },
  profile: {
    container: 'bg-gray-50',
    headerSection: 'bg-white',
  },
  mainContainer: {
    background: 'bg-background',
    container: 'bg-gray-50',
  },
  overlay: {
    background: 'bg-background',
    container: 'bg-white',
  },
  categoryGrid: {
    container: 'mx-4 mb-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100',
  },
  storeCard: {
    container: 'mx-4 -mt-16 relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-4',
  },
};

// 版本3样式
export const version3Styles: VersionStyles = {
  header: {
    container: 'bg-primary',
    paddingBottom: 'pb-24',
    searchBarMargin: 'mb-6',
  },
  banner: {
    container: 'mx-4 mb-6 rounded-2xl',
    margin: 'mx-4',
    borderRadius: 'rounded-2xl',
  },
  bottomNav: {
    container: 'bg-white border-t border-gray-200',
    itemActive: 'text-secondary fill-current',
    itemInactive: 'text-gray-400',
  },
  profile: {
    container: 'bg-gray-50',
    headerSection: 'bg-white',
  },
  mainContainer: {
    background: 'bg-background',
    container: 'bg-gray-50',
  },
  overlay: {
    background: 'bg-background',
    container: 'bg-white',
  },
  categoryGrid: {
    container: 'mx-4 mb-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100',
  },
  storeCard: {
    container: 'mx-4 -mt-16 relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-4',
  },
};

// 版本4样式 - 完整版
export const version4Styles: VersionStyles = {
  header: {
    container: 'bg-primary',
    paddingBottom: 'pb-24',
    searchBarMargin: 'mb-6',
  },
  banner: {
    container: 'mx-4 mb-6 rounded-2xl',
    margin: 'mx-4',
    borderRadius: 'rounded-2xl',
  },
  bottomNav: {
    container: 'bg-white border-t border-gray-200',
    itemActive: 'text-secondary fill-current',
    itemInactive: 'text-gray-400',
  },
  profile: {
    container: 'bg-gray-50',
    headerSection: 'bg-white',
  },
  mainContainer: {
    background: 'bg-background',
    container: 'bg-gray-50',
  },
  overlay: {
    background: 'bg-background',
    container: 'bg-white',
  },
  categoryGrid: {
    container: 'mx-4 mb-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100',
  },
  storeCard: {
    container: 'mx-4 -mt-16 relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-4',
  },
};

// 根据版本号获取对应的样式配置
export const getVersionStyles = (version: number): VersionStyles => {
  switch (version) {
    case 1:
      return version1Styles;
    case 2:
      return version2Styles;
    case 3:
      return version3Styles;
    case 4:
      return version4Styles;
    default:
      return version4Styles;
  }
};

