import requests

def _proxyConvert(link: str):
    content = requests.get(link).content
    return str(content, encoding='utf-8').split("\r\n")

def proxys(type):
    """
    type = ["http","socks4","socks5"]
    """
    match type:
        case "http":
            return _proxyConvert("https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all") 
        case "socks4":
            return _proxyConvert("https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4&timeout=10000&country=all")
        case "socks5":
            return _proxyConvert("https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all")



