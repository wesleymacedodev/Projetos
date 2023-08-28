import requests
import re

def _proxyConvert(link: str):
    content = requests.get("https://openproxy.space/list/http").content 
    proxies = re.findall(r"[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+", str(content))
    return proxies


def proxys(type) -> list:
    """
    type = ["http","socks4","socks5"]
    """
    match type:
        case "http":
            return _proxyConvert("https://openproxy.space/list/http") 
        case "socks4":
            return _proxyConvert("https://openproxy.space/list/socks4")
        case "socks5":
            return _proxyConvert("https://openproxy.space/list/socks5")



