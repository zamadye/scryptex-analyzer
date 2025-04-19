
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import random

# In-memory database
db = {
    "users": {},
    "credits": {},
    "referrals": {},
    "airdrops": [],
    "notifications": [],
    "sessions": {},
    "wallets": {},
    "projects": {
        "Arbitrum": {
            "about_project": "Arbitrum is a layer 2 scaling solution for Ethereum, designed to improve the scalability and efficiency of Ethereum smart contracts.",
            "tokenomics": "ARB token has a total supply of 10 billion tokens, with 60% allocated to the community.",
            "roadmap": "2023 Q4: Stylus integration, 2024 Q1: Improved cross-chain communication, 2024 Q2: Advanced fraud proofs",
            "backers": ["Pantera Capital", "Coinbase Ventures", "Polychain Capital"],
            "team": ["Steven Goldfeder", "Harry Kalodner", "Ed Felten"]
        },
        "Optimism": {
            "about_project": "Optimism is an Ethereum Layer 2 scaling solution that uses optimistic rollups to achieve lower fees and latency.",
            "tokenomics": "OP token launched with 4.3 billion tokens, with gradual distribution to the community.",
            "roadmap": "2023 Q4: Bedrock upgrade, 2024 Q1: Cannon fraud proofs, 2024 Q2: Improved bridging",
            "backers": ["a16z", "Paradigm", "IDEO CoLab Ventures"],
            "team": ["Jinglan Wang", "Karl Floersch", "Ben Jones"]
        },
        "ZkSync": {
            "about_project": "ZkSync is a ZK rollup solution focused on scaling payments and smart contracts on Ethereum.",
            "tokenomics": "No token has been announced yet, but a future release is expected.",
            "roadmap": "2023 Q4: ZkSync Era, 2024 Q1: Advanced zkEVM, 2024 Q2: Cross-chain messaging",
            "backers": ["Ethereum Foundation", "Consensys", "Winklevoss Capital"],
            "team": ["Alex Gluchowski", "Alex Vlasov", "Alexandr Liutiev"]
        },
        "Starknet": {
            "about_project": "Starknet is a permissionless decentralized ZK-Rollup operating as an L2 network over Ethereum.",
            "tokenomics": "STRK token with 10 billion initial supply allocated to community, contributors, and foundation.",
            "roadmap": "2023 Q4: Cairo 1.0, 2024 Q1: Starknet Quantum Leap, 2024 Q2: Volition",
            "backers": ["Paradigm", "Sequoia Capital", "StarkWare"],
            "team": ["Uri Kolodny", "Eli Ben-Sasson", "Michael Riabzev"]
        },
        "Base": {
            "about_project": "Base is an Ethereum Layer 2 incubated by Coinbase, powered by Optimism's OP Stack.",
            "tokenomics": "No native token, aligns with Ethereum's and Optimism's tokenomics.",
            "roadmap": "2023 Q4: Mainnet stability, 2024 Q1: Developer tooling, 2024 Q2: Enhanced bridging",
            "backers": ["Coinbase", "Optimism Collective"],
            "team": ["Jesse Pollak", "David Haber", "Claire Huang"]
        }
    },
    "farming_tasks": {
        "Arbitrum": [
            {"type": "swap", "description": "Swap ETH for ARB", "credits": 5},
            {"type": "mint", "description": "Mint Arbitrum NFT", "credits": 10},
            {"type": "lp", "description": "Add liquidity to ARB/ETH pool", "credits": 15}
        ],
        "Optimism": [
            {"type": "swap", "description": "Swap ETH for OP", "credits": 5},
            {"type": "bridge", "description": "Bridge assets to Optimism", "credits": 8},
            {"type": "lp", "description": "Add liquidity to OP/USDC pool", "credits": 12}
        ],
        "Base": [
            {"type": "swap", "description": "Swap ETH for cbETH", "credits": 5},
            {"type": "nft", "description": "Mint Base Originals NFT", "credits": 10},
            {"type": "onboarding", "description": "Complete Base Onboarding", "credits": 7}
        ]
    },
    "twitter_templates": [
        "Just discovered {project}! Their approach to {feature} is revolutionary. #Web3 #{project}",
        "I'm impressed with {project}'s {feature}. The future looks promising! #Blockchain #{project}",
        "Been using {project} for a while now - their {feature} is game-changing! #{project} #Crypto",
        "The team at {project} is building something special with {feature}. Worth checking out! #DeFi",
        "{project} is setting new standards with their {feature}. Excited to see what's next! #Innovation"
    ],
    "project_features": {
        "Arbitrum": ["L2 scaling", "fraud proofs", "Nitro upgrade", "governance", "transaction batching"],
        "Optimism": ["rollups", "OP Stack", "fault proofs", "Superchain", "decentralized sequencer"],
        "ZkSync": ["zkEVM", "validity proofs", "account abstraction", "hyperscaling", "native ECDSA"],
        "Starknet": ["STARK proofs", "Cairo language", "on-chain data availability", "Volition", "quantum resistance"],
        "Base": ["developer experience", "incubation program", "Coinbase integration", "OP Stack upgrades", "consumer adoption"]
    },
    "chains": [
        {"name": "Arbitrum One", "chain_id": 42161, "currency": "ETH", "rpc": "https://arb1.arbitrum.io/rpc"},
        {"name": "Optimism", "chain_id": 10, "currency": "ETH", "rpc": "https://mainnet.optimism.io"},
        {"name": "ZkSync Era", "chain_id": 324, "currency": "ETH", "rpc": "https://mainnet.era.zksync.io"},
        {"name": "Base", "chain_id": 8453, "currency": "ETH", "rpc": "https://mainnet.base.org"},
        {"name": "Starknet", "chain_id": 9, "currency": "ETH", "rpc": "https://starknet-mainnet.infura.io"}
    ]
}

# Default airdrops
default_airdrops = [
    {
        "id": "airdrop-001",
        "projectName": "Arbitrum",
        "link": "https://arbitrum.foundation/airdrop",
        "deadline": (datetime.now() + timedelta(days=30)).isoformat(),
        "description": "Complete tasks to be eligible for the ARB token airdrop",
        "chain": "Arbitrum One",
        "status": "active"
    },
    {
        "id": "airdrop-002",
        "projectName": "LayerZero",
        "link": "https://layerzero.network/airdrop",
        "deadline": (datetime.now() + timedelta(days=45)).isoformat(),
        "description": "Use the cross-chain bridge to qualify for ZRO tokens",
        "chain": "Multiple",
        "status": "active"
    },
    {
        "id": "airdrop-003",
        "projectName": "ZkSync",
        "link": "https://zksync.io/airdrop",
        "deadline": (datetime.now() + timedelta(days=60)).isoformat(),
        "description": "Interact with zkSync Era to potentially receive tokens",
        "chain": "ZkSync Era",
        "status": "upcoming"
    }
]

# Populate initial data
db["airdrops"] = default_airdrops

def get_user_by_email(email: str) -> Optional[Dict]:
    """Get a user by email"""
    return db["users"].get(email)

def create_user(username: str, email: str, password: str) -> Dict:
    """Create a new user"""
    user_id = f"user_{len(db['users']) + 1}"
    user = {
        "id": user_id,
        "username": username,
        "email": email,
        "password": password,  # In real app, this would be hashed
        "created_at": datetime.now().isoformat()
    }
    db["users"][email] = user
    # Initialize credits for new user
    db["credits"][user_id] = 20
    # Initialize referral code
    referral_code = f"{username.lower()}{random.randint(1000, 9999)}"
    db["referrals"][user_id] = {
        "code": referral_code,
        "link": f"https://scryptex.io/refer?code={referral_code}",
        "invites": 0,
        "earned_credits": 0
    }
    return user

def get_user_credits(user_id: str) -> int:
    """Get user credits"""
    return db["credits"].get(user_id, 0)

def add_credits(user_id: str, amount: int) -> int:
    """Add credits to user account"""
    if user_id not in db["credits"]:
        db["credits"][user_id] = 0
    db["credits"][user_id] += amount
    return db["credits"][user_id]

def consume_credits(user_id: str, amount: int) -> bool:
    """Consume credits from user account"""
    if user_id not in db["credits"] or db["credits"][user_id] < amount:
        return False
    db["credits"][user_id] -= amount
    return True

def add_notification(user_id: str, title: str, message: str, type: str = "info") -> Dict:
    """Add a notification"""
    notification = {
        "id": f"notif-{len(db['notifications']) + 1}",
        "user_id": user_id,
        "title": title,
        "message": message,
        "type": type,
        "read": False,
        "timestamp": datetime.now().isoformat()
    }
    db["notifications"].append(notification)
    return notification

def get_user_notifications(user_id: str, limit: int = 5) -> List[Dict]:
    """Get notifications for a user"""
    user_notifications = [n for n in db["notifications"] if n["user_id"] == user_id]
    return sorted(user_notifications, key=lambda x: x["timestamp"], reverse=True)[:limit]

def add_airdrop(airdrop: Dict) -> Dict:
    """Add a new airdrop"""
    airdrop_id = f"airdrop-{len(db['airdrops']) + 1:03d}"
    airdrop["id"] = airdrop_id
    db["airdrops"].append(airdrop)
    return airdrop

def get_airdrops() -> List[Dict]:
    """Get all airdrops"""
    return db["airdrops"]

def connect_wallet(user_id: str, wallet_address: str) -> Dict:
    """Connect wallet to user account"""
    wallet = {
        "address": wallet_address,
        "connected_at": datetime.now().isoformat(),
        "status": "connected"
    }
    db["wallets"][user_id] = wallet
    return wallet

def get_user_wallet(user_id: str) -> Optional[Dict]:
    """Get wallet for a user"""
    return db["wallets"].get(user_id)

def add_referral(referrer_id: str, referee_email: str) -> bool:
    """Process a referral"""
    if referrer_id not in db["referrals"]:
        return False
    
    # Increment invites
    db["referrals"][referrer_id]["invites"] += 1
    
    # Add credits to referrer
    credit_reward = 10
    add_credits(referrer_id, credit_reward)
    db["referrals"][referrer_id]["earned_credits"] += credit_reward
    
    return True

def get_referral_stats(user_id: str) -> Dict:
    """Get referral stats for a user"""
    if user_id not in db["referrals"]:
        return {
            "code": "",
            "link": "",
            "invites": 0,
            "earned_credits": 0
        }
    return db["referrals"][user_id]
