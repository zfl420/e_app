import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface MarketingProps {
  onBack: () => void;
}

type MainTabType = 'recommended' | 'history';
type RecommendedSubTabType = 'calendar' | 'owner' | 'store';

const Marketing: React.FC<MarketingProps> = ({ onBack }) => {
  const [mainTab, setMainTab] = useState<MainTabType>('recommended');
  const [recommendedSubTab, setRecommendedSubTab] = useState<RecommendedSubTabType>('calendar');

  // 近30天数据
  const statsData = {
    created: 7,
    successCount: 4,
    successMessages: 8,
    storeVisits: 4,
    visitRate: 100,
  };

  // 营销日历数据
  const calendarCampaigns = [
    {
      season: '春季',
      campaigns: [
        {
          id: '1',
          title: '春季出游',
          description: '春季踏春好时节,提醒车主到店检测、保养,安全出行。',
          bgColor: 'bg-green-50',
          tag: null,
        },
        {
          id: '2',
          title: '520活动邀约',
          description: '结合520进行优惠活动,送上祝福的同时,吸引车主到店服务',
          bgColor: 'bg-green-50',
          tag: null,
        },
      ],
    },
    {
      season: '夏季',
      campaigns: [
        {
          id: '3',
          title: '夏季大促',
          description: '夏季气温高,空调、发动机等往往需要检测保养,可以推荐关联项目。',
          bgColor: 'bg-blue-50',
          tag: '大促',
        },
      ],
    },
  ];

  // 车主运营数据
  const ownerOperations = [
    {
      id: 'o1',
      title: '卡专项锁客',
      description: '面向老客推送保养次卡、洗车次卡活动,提升老客粘性。',
      tag: '热门活动',
      bgColor: 'bg-white',
    },
    {
      id: 'o2',
      title: '休眠客户激活',
      description: '针对休眠客户发放常用高毛利低成本项目优惠券,激活休眠客户。',
      tag: null,
      bgColor: 'bg-white',
    },
    {
      id: 'o3',
      title: '潜客促活',
      description: '针对潜在客户发放常用高毛利低成本项目,吸引潜客到店消费。',
      tag: null,
      bgColor: 'bg-white',
    },
    {
      id: 'o4',
      title: '流失客户召回',
      description: '客户流失要尤为注意,可通过卡、活动,定期对流失客户进行召回。',
      tag: null,
      bgColor: 'bg-white',
    },
  ];

  // 门店事件数据
  const storeEvents = [
    {
      id: 'e1',
      title: '到店检测通知',
      description: '检测作为挖掘商机的方式,可以结合节日、天气等情况使用',
      tag: null,
      bgColor: 'bg-white',
    },
    {
      id: 'e2',
      title: '周年庆',
      description: '周年庆典,可举办大型综合型活动,吸引新老客户到店。',
      tag: '周年庆活动',
      bgColor: 'bg-white',
    },
    {
      id: 'e3',
      title: '放假复工通知',
      description: '因为节假日等情况放假复工,提前通知客户,维系客情。',
      tag: '年后复工',
      bgColor: 'bg-white',
    },
    {
      id: 'e4',
      title: '营业变更通知',
      description: '遇到疫情、夏令时营业时间调整等情况,可提前通知客户,维系客情。',
      tag: null,
      bgColor: 'bg-white',
    },
  ];

  // 历史记录数据
  const historyRecords = [
    {
      id: 'h1',
      date: '2025-12-01',
      campaignTitle: '春季出游',
      customers: [
        {
          id: 'c1',
          name: '张先生',
          phone: '138****8888',
          sentContent: '春季踏春好时节,提醒车主到店检测、保养,安全出行。',
          status: '已发送',
        },
        {
          id: 'c2',
          name: '李女士',
          phone: '139****9999',
          sentContent: '春季踏春好时节,提醒车主到店检测、保养,安全出行。',
          status: '已发送',
        },
      ],
    },
    {
      id: 'h2',
      date: '2025-11-28',
      campaignTitle: '520活动邀约',
      customers: [
        {
          id: 'c3',
          name: '王先生',
          phone: '137****7777',
          sentContent: '结合520进行优惠活动,送上祝福的同时,吸引车主到店服务',
          status: '已发送',
        },
        {
          id: 'c4',
          name: '赵女士',
          phone: '136****6666',
          sentContent: '结合520进行优惠活动,送上祝福的同时,吸引车主到店服务',
          status: '已发送',
        },
      ],
    },
  ];

  // 渲染活动卡片
  const renderCampaignCard = (campaign: { id: string; title: string; description: string; tag: string | null; bgColor: string }) => (
    <div
      key={campaign.id}
      className={`${campaign.bgColor} rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden shadow-sm`}
    >
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-sm font-semibold text-gray-900">{campaign.title}</h4>
            {campaign.tag && (
              <span className="inline-block text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                {campaign.tag}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {campaign.description}
          </p>
        </div>
        <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg whitespace-nowrap hover:bg-red-600 transition-colors">
          立即使用
        </button>
      </div>
    </div>
  );

  const renderRecommendedContent = () => {
    if (recommendedSubTab === 'calendar') {
      return (
        <div className="space-y-6 pb-6">
          {calendarCampaigns.map((season) => (
            <div key={season.season}>
              <h3 className="text-base font-semibold text-gray-900 mb-3 px-4">
                {season.season}
              </h3>
              <div className="space-y-3 px-4">
                {season.campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`${campaign.bgColor} rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden`}
                  >
                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="flex-1">
                        {campaign.tag && (
                          <span className="inline-block text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded mb-2">
                            {campaign.tag}
                          </span>
                        )}
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {campaign.description}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg whitespace-nowrap hover:bg-red-600 transition-colors">
                        立即使用
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (recommendedSubTab === 'owner') {
      return (
        <div className="space-y-3 pb-6 px-4">
          {ownerOperations.map((campaign) => renderCampaignCard(campaign))}
        </div>
      );
    } else if (recommendedSubTab === 'store') {
      return (
        <div className="space-y-3 pb-6 px-4">
          {storeEvents.map((campaign) => renderCampaignCard(campaign))}
        </div>
      );
    }
  };

  const renderHistoryContent = () => {
    return (
      <div className="space-y-4 pb-6 px-4">
        {historyRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{record.campaignTitle}</span>
                <span className="text-xs text-gray-500">{record.date}</span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {record.customers.map((customer) => (
                <div key={customer.id} className="px-4 py-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                        <span className="text-xs text-gray-500">{customer.phone}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{customer.sentContent}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded ml-2 whitespace-nowrap">
                      {customer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部栏 */}
      <div className="bg-white pt-10 pb-4 px-4 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex-1 text-center text-base font-semibold text-gray-900">
          精准营销
        </div>
        <div className="w-6" /> {/* 占位符，保持标题居中 */}
      </div>

      {/* 说明文字 */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <p className="text-xs text-gray-600 leading-relaxed">
          适用于活动通知、营业通知、节日祝福等非常规营销。周期性服务 (如小保养,火花塞),请使用「商机管理」功能,自动化营销。
        </p>
      </div>

      {/* 近30天数据 */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">近30天数据</h3>
          <button className="text-sm text-red-500 font-medium flex items-center gap-1">
            创建群发 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {statsData.created}
            </div>
            <div className="text-xs text-gray-500">已创建</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {statsData.successCount}
            </div>
            <div className="text-xs text-gray-500">发送成功人数</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {statsData.successMessages}
            </div>
            <div className="text-xs text-gray-500">发送成功条数</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {statsData.storeVisits}
            </div>
            <div className="text-xs text-gray-500">到店客户</div>
          </div>
        </div>
        <div className="mt-3 bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-semibold text-gray-900 mb-1">
            {statsData.visitRate}%
          </div>
          <div className="text-xs text-gray-500">客户到店率</div>
        </div>
      </div>

      {/* 主标签导航 */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-around">
          {(['recommended', 'history'] as MainTabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold relative ${
                mainTab === tab ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {tab === 'recommended' && '推荐方案'}
              {tab === 'history' && '历史记录'}
              {mainTab === tab && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-red-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 推荐方案子标签导航 */}
      {mainTab === 'recommended' && (
        <div className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-around">
            {(['calendar', 'owner', 'store'] as RecommendedSubTabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setRecommendedSubTab(tab)}
                className={`flex-1 py-3 text-sm font-medium relative ${
                  recommendedSubTab === tab ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                {tab === 'calendar' && '营销日历'}
                {tab === 'owner' && '车主运营'}
                {tab === 'store' && '门店事件'}
                {recommendedSubTab === tab && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-red-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {mainTab === 'recommended' && renderRecommendedContent()}
        {mainTab === 'history' && renderHistoryContent()}
      </div>
    </div>
  );
};

export default Marketing;

